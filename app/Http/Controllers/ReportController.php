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
use Illuminate\Database\Eloquent\Collection;
use Excel,DB;


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

    public function exportExcel(){

      $file_name = str_slug(Input::get('name'),'_') . '_' . time();
      $mode_id = Input::get('id');
      $current_page = Input::get('current_page');

      $resule = Excel::store(new InvoicesExport($mode_id,$current_page), 'public/' . $file_name . '.xlsx');

      if($resule){
        return $file_name;
      }

      return 0;

    }

}
