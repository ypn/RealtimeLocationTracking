<?php
  namespace App\Entities;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\QueryException;
  use Illuminate\Http\Response as Res;


  class TrackingLogger extends Model{
    protected $table = 'tracking_logger';

    protected function listObjectsOnTracking($mode_id){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('mode_id',$mode_id)->where('type',1)->get()
      ]);
    }

    protected function listAllObjectOnTracking(){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list' => $this->where('type',1)->get()
      ]);
    }
  }
