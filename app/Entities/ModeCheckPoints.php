<?php
  namespace App\Entities;

  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\QueryException;
  use Illuminate\Http\Response as Res;

  class ModeCheckPoints extends Model{
    protected $table = 'mode_checkpoints';

    protected function addRemoveFromMode($input){
      if($input['state']){
        try{
          $this->mode_id = $input['mode_id'];
          $this->checkpoint_id  = $input['checkpoint_id'];        
          $this->save();
          return response()->json([
              'status' => 'success',
              'status_code' => Res::HTTP_OK
          ]);
        }catch(QueryException $ex){
            return response()->json([
                'status' => 'query_err',
                'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY,
                'message' => $ex->getMessage()

            ]);
        }
      }else{
        try{
          $this->where('mode_id',$input['mode_id'])->where('checkpoint_id',$input['checkpoint_id'])->delete();
          return response()->json([
              'status' => 'success',
              'status_code' => Res::HTTP_OK
          ]);
        }
        catch(QueryException $ex){
          return response()->json([
              'status' => 'query_err',
              'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY,
              'message' => $ex->getMessage()

          ]);
        }
      }
    }


    protected function onChangeStateModeCheckPoint($input){
      $item = $this->where('mode_id',$input['mode_id'])->where('checkpoint_id',$input['checkpoint_id'])->first();

      if(!empty($item)){
        try{
          $item->status = !$item->status;
          $item->save();
          return response()->json([
              'status' => 'success',
              'status_code' => Res::HTTP_OK
          ]);
        }catch(QueryException $ex){
          return response()->json([
              'status' => 'query_err',
              'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY,
              'message' => $ex->getMessage()

          ]);
        }
      }
    }

    protected function listEnabled($mode_id){
      return $this->where('mode_id',$mode_id)->pluck('checkpoint_id')->toArray();;
    }

    protected function isCheckPointAvaiabled($input){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'item' => $this->where('mode_id',$input['mode_id'])->where('checkpoint_id',$input['checkpoint_id'])->first()
      ]);
    }

  }
