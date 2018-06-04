<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Input;
use App\Entities\ModesTracking;
use App\Entities\TrackingLogger;
use App\Entities\CheckPoint;
use App\Entities\ModeCheckPoints;
use Illuminate\Database\Eloquent\Collection;
use Excel,DB;
use Carbon\Carbon;
use DateTime;


use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{
    protected $mode_id;
    protected $current_page;

    public function __construct ($mode_id,$current_page){
      $this->mode_id = $mode_id;
      $this->current_page  = $current_page;
    }

    public function collection()
    {
      $mode = ModesTracking::select('table_reference','display_property')->where('id',$this->mode_id)->first();
      $table ='';
      if(isset($mode->table_reference)){
        $table = $mode->table_reference;
      }

      $rows =  TrackingLogger::select('object_tracking','status','object_id','object_id','created_at','ended_at')
      ->where('mode_id',$this->mode_id)->where('type',0)->get();

      foreach($rows as $k=>$r){
        $object_name = DB::table($table)->select('object_name')->where('id',$r->object_tracking)->first();

        $r[$mode->display_property] = $object_name->object_name;

        $checkpoints = json_decode($r->status);
        foreach($checkpoints as $c){
          $cp = CheckPoint::where('id',$c->checkpointId)->first();
          $r[$cp->name] = $c->total_time;
        }
      }


        return $rows;
    }
}

class ReportController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function listObjectTracked(){
      return TrackingLogger::listObjectsTracked(Input::get('id'),Input::get('offset'));
    }

    public function getDetail(){
      return TrackingLogger::getDetail(Input::get('id'));
    }

    protected function parseDateArray($date_array){
      return  (date('Y-m-d H:i:s', mktime($date_array['hour'], $date_array['minute'], $date_array['second'], $date_array['month'], $date_array['day'], $date_array['year'])));
    }

    protected function getTimeInCheckPoint($total_time,$time_start,$time_end,$ended_at){

      if($time_start==''){
        return 0;
      }

      $time_start_array = date_parse($time_start);

      $time_start =  strtotime($this->parseDateArray($time_start_array));
      if($time_end==''){
        $time_end = strtotime($ended_at);
        return intval($total_time) + ($time_end - $time_start);
      }else{
        $time_end_array = date_parse($time_end);
        $time_end = strtotime($this->parseDateArray($time_end_array));
        if($time_end - $time_start < 0 ){
          return intval($total_time) + (strtotime($ended_at) - $time_start);
        }
      }

      return $total_time;

    }

    public function exportExcel($mode_id){

      $mode = ModesTracking::getWithCustomInput(['display_property','object_owner','table_reference','id'],$mode_id);

      $checkpoint =  ModeCheckPoints::join('checkpoints','mode_checkpoints.checkpoint_id','=','checkpoints.id')
      ->select('checkpoints.name','checkpoints.id')->where('mode_checkpoints.mode_id',$mode_id)->get();

      $list = TrackingLogger::select('id','status','object_tracking','created_at','ended_at','object_id')
      ->where('mode_id',$mode_id)->where('type',0)
      ->where('path','NOT LIKE','[]')
      ->orderBy('id','desc')
      ->get();

      foreach($list as $l){
        $obj = DB::table($mode->table_reference)->where('id',$l->object_id)->first();
        $l->object_info = $obj;

        $status = json_decode($l->status);
        $time_checkpoints = array();
        foreach($status as $s){
          $t = $this->getTimeInCheckPoint($s->total_time,$s->time_start,$s->time_end,$l->ended_at);

          $min = floor($t /60);
          $sec = $t - $min * 60;

          array_push($time_checkpoints,$min .'m'.':'.$sec.'s');
        }

        $l->time_checkpoints = $time_checkpoints;
      }


      return view ('admin.export_excel',[
        'mode'=>$mode,
        'checkpoints'=>$checkpoint,
        'list'=>$list
      ]);

    }

    public function getTrackingDetail($id){
      $result = TrackingLogger::where('id',$id)->first();

      $status = json_decode($result->status);
      foreach($status as $s){
        $name = Checkpoint::where('id',$s->checkpointId)->first();
        if($name){
            $s->name = $name->name;
        }else{
          $s->name = 'Chưa xác định';
        }

      }
      $result->status = $status;

      return json_encode($result);
    }

}
