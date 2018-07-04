<?php
  namespace App\Entities;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\QueryException;
  use Illuminate\Http\Response as Res;
  use App\Entities\ModesTracking;
  use App\Entities\CheckPoint;
  use DB;
  use Carbon\Carbon;


  class TrackingLogger extends Model{
    protected $table = 'tracking_logger';
    //Danh sách các đối tượng đang được theo dõi theo chế độ theo dõi
    protected function listObjectsOnTracking($mode_id){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('mode_id',$mode_id)->where('type',1)->get()
      ]);
    }

    //Danh sách các đối tượng đã dừng theo dõi
    protected function listObjectsTracked($mode_id,$offset){

      $mode = ModesTracking::getWithCustomInput(['table_reference','id'],$mode_id);

      $list = $this
      ->select('id','status','object_tracking','created_at','ended_at','object_id')
      ->where('mode_id',$mode_id)->where('type',0)
      ->where('path','NOT LIKE','[]')
      ->offset($offset)
      ->limit(10)
      ->orderBy('id','desc')
      ->get()
      ;

      foreach($list as $l){
        $obj = DB::table($mode->table_reference)->where('id',$l->object_id)->first();
        $l->object_info = $obj;
      }

      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' =>$list,
          'full_length'=>ceil($this->where('mode_id',$mode_id)->where('type',0)->count() / 10)
      ]);
    }

    //Danh sách tất cả các đối tượng đang theo dõi (thuộc tất cả các chế độ theo dõi)
    protected function listAllObjectOnTracking(){
      $list = $this->where('type',1)->get();

      foreach($list as $l){
        $mode = ModesTracking::select('name')->where('id',$l->mode_id)->first();
        $l->mode_name = $mode->name;
      }
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $list
      ]);
    }

    //Danh sách tất cả cá đối tượng đã dừng theo dõi (thuộc tất cả các chế độ theo dõi)
    protected function listAllObjectTracked(){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('type',0)->where('path','=','[]')->get()
      ]);
    }

    //Lấy thông tin chi tiết của 1 phiên theo dõi
    protected function getDetail($id){
      return response()->json([
        'status' => 'success',
        'status_code' => Res::HTTP_OK,
        'data'=>$this->where('id',$id)->first()
      ]);
    }

    protected function getMinimum($id){
      $data = $this->select('status','object_tracking','mode_id','object_id','created_at','ended_at','timeline')->where('id',$id)->first();
      return([
        'status'=>'success',
        'status_code'=>Res::HTTP_OK,
        'data'=>$data
      ]);
    }

    protected function getViolateSubject($input){

      //return $input;

      // $list = TrackingLogger::select('id','object_id','mode_id')->get();
      // foreach($list as $l){
      //   $mode = ModesTracking::getModeParent($l->mode_id);
      //   $t = TrackingLogger::where('id',$l->id)->first();
      //
      //   $t->key_unique_object = $mode->parent!=null ? $this->cantor_pair_calculate($mode->parent,$l->object_id) : $this->cantor_pair_calculate($l->mode_id,$l->object_id);
      //   $t->save();
      // }
      //
      // die;



      $list = TrackingLogger::select('id','timeline','type','object_id','mode_id','created_at','object_tracking','key_unique_object')
      ->whereIn('mode_id',$input['listMode'])
      ->where('ended_at','>=',$input['from_date'])
      ->where('ended_at','<=',$input{'to_date'})
      ->where('type',0)
      ->get();

      foreach($list as $k=>$l){
        if($l->timeline =='[]'){
          unset($list[$k]);
        }else{
          $timeline = json_decode($l->timeline);
          $timelineformatted = array();
          foreach($timeline as $key=>$t){
            $t = json_decode($t);
            if($t->type ==1){
              $time_end = ($key < count($timeline)-1 ) ? new Carbon((json_decode($timeline[$key+1]))->time_at) : new Carbon($t->time_at);
              $time_start = new Carbon($t->time_at);
              $second_diff = $time_end->diffInSeconds($time_start);
              if($second_diff < 1800){
                unset($timeline[$key]);
                unset($timeline[$key+1]);
              }else{
                $b = array();
                $b['in'] = $t->time_at;
                $b['out'] = (json_decode($timeline[$key+1]))->time_at;
                $b['diff'] = $this->getTimeDiff($time_start,$time_end);
                $b['check_point'] = CheckPoint::getName($t->checkpointID);
                array_push($timelineformatted,$b);
              }
            }
          }

          $l->timelineformatted = $timelineformatted;

          $l->timeline = $timeline;

          if(count($l->timeline)==0){
            unset($list[$k]);
          }
        }
      }

      $output = array();
      foreach($list as $l){
        unset($l->timeline);
        $output[$l['key_unique_object']]['object_tracking'] = $l->object_tracking;
        // $output[$l['key_unique_object']]['error'] = count($l->timelineformatted);

        $output[$l['key_unique_object']]['list'][] = $l;
        $output[$l['key_unique_object']]['session'] =  count($output[$l['key_unique_object']]['list']);

        $error =0;

        foreach($l->timelineformatted as $tl){
          $output[$l['key_unique_object']]['list_error'][] = $tl;
        }

        $output[$l['key_unique_object']]['error'] = isset($output[$l['key_unique_object']]['list_error']) ? count($output[$l['key_unique_object']]['list_error']) : 0;
      }
      return $output;
    }

    private function getTimeDiff($time1,$time2){
      $second_diff = $time2->diffInSeconds($time1);
      $min_diff = floor($second_diff/60);
      $sec = $second_diff - $min_diff*60;
      $hour = floor($min_diff/60);
      $m = $min_diff - $hour*60;
      return($hour . 'h' . ':' . $m . 'm' .':' .$sec .'s');
    }

    private function cantor_pair_calculate($x, $y) {
      return (($x + $y) * ($x + $y + 1)) / 2 + $y;
    }
  }
