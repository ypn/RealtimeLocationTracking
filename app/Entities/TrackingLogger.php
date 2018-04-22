<?php
  namespace App\Entities;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\QueryException;
  use Illuminate\Http\Response as Res;
  use App\Entities\ModesTracking;
  use DB;


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
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('type',1)->get()
      ]);
    }

    //Danh sách tất cả cá đối tượng đã dừng theo dõi (thuộc tất cả các chế độ theo dõi)
    protected function listAllObjectTracked(){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('type',0)->get()
      ]);
    }
  }
