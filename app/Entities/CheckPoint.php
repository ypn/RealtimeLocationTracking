<?php
  namespace App\Entities;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\QueryException;
  use Illuminate\Http\Response as Res;


  class CheckPoint extends Model{
    protected $table = 'checkpoints';

    protected function create($input){
      try{
        $this->name = $input['checkpoint_name'];
        $this->time = round(60*$input['checkpoint_time']);
        $this->description = $input['description'];
        $this->polygon = json_encode($input['polygon']);
        $this->save();

        return response()->json([
          'status'=>'success',
          'code'=>Res::HTTP_OK
        ]);
      }catch(QueryException $ex){
        return response()->json([
          'status'=>'error',
          'code'=>RES::HTTP_UNPROCESSABLE_ENTITY,
          'message'=>$ex->getMessage()
        ]);
      }
    }

    protected function list(){
      return response()-> json([
        'status'=>'success',
        'code'=>RES::HTTP_OK,
        'list'=>$this->get()
      ]);
    }


    protected function getCheckpoint($id){
      return response()->json([
        'status'=>'success',
        'code'=>RES::HTTP_OK,
        'item'=>$this->where('id',$id)->first()
      ]);
    }

    protected function getName($id){
      $cp = $this->select('name')->where('id',$id)->first();
      return (isset($cp->name) ? $cp->name : '');
    }

    protected function editCheckPoint($id,$value){
      $query = $this->where('id',$id)->update([
        'name'=>$value['name'],
        'time'=> round(60*$value['time']),
        'description'=>$value['description'],
        'polygon'=>$value['polygon']
      ]);
      return $query;
    }

  }
