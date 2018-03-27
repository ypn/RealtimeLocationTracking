<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Response as Res;
use Carbon\Carbon;

class ModesTracking extends Model
{
    protected $table = 'modes_tracking';


    protected function add($data){
      $mode_name = $data['mode_name'];
      $object_name = $data['object_name'];
      $display_property = $data['display_property'];
      $is_identification = $data['is_identitication'];
      $is_phone_number = $data['is_phone_number'];
      try{
        $this->name = $mode_name;
        $this->table_reference  = str_slug($mode_name . Carbon::now()->timestamp,'_');
        $this->object_tracking = $object_name;
        $this->display_property = $display_property;
        if(isset($data['object_owner'])){
          $this->object_owner = $data['object_owner'];
        }

        $this->is_required_phone_number = $is_phone_number? $is_phone_number:false;
        $this->is_required_identification = $is_identification ? $is_identification:false;
        $this->save();

        Schema::create( str_slug($mode_name . Carbon::now()->timestamp,'_') , function (Blueprint $table) use ($data) {
            $table->increments('id');
            $table->string('object_name');

            if(isset($data['object_owner'])){
                $table->string('object_owner');
            }

            if($data['is_phone_number']){
                $table->string('phone_number');
            }

            if($data['is_identitication']){
                $table->string('identification');
            }

            $table->string('organization');
            $table->string('display_property');
            $table->timestamps();
        });

        return response()->json([
            'status' => 'success',
            'status_code' => Res::HTTP_CREATED
        ]);

      }catch(QueryException $ex){
        return response()->json([
            'status' => 'error',
            'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY,
            'message' => $ex->getMessage()

        ]);
      }
    }

    protected function list(){
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK,
          'list'=>$this->get()
      ]);
    }

    protected function minList($data){
      return($this->select($data)->get());
    }

    protected function del($id,$table_reference){
      if(!$this->find($id)->delete()){
        return response()->json([
            'status' => 'error',
            'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY
        ]);
      }
      Schema::drop($table_reference);
      return response()->json([
          'status' => 'success',
          'status_code' => Res::HTTP_OK
      ]);
    }

    protected function updateState($id){
       try{
         $item = $this->find($id);
         $item->state = !$item->state;
         $item->save();
       }catch(QueryException $ex){
         return response()->json([
             'status' => 'error',
             'status_code' => Res::HTTP_UNPROCESSABLE_ENTITY,
             'message'=>$ex->getMessage()
         ]);
       }
    }

    protected function getMode($id){
      return $this->find($id);
    }
}
