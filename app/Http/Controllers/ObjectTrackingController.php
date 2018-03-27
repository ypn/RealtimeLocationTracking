<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Database\QueryException;
use Illuminate\Http\Response as Res;
use DB,Validator;

class ObjectTrackingController extends Controller
{
    public function create(){
      try{
        $table = Input::get('table');
        $data = Input::get('data');

        $rules  = [
          'object_name'=>'required'
        ];

        $validator = Validator::make($data,$rules);
        if($validator->fails()){
          return response()->json([
              'status' => 'validator_error',
              'status_code' => Res::HTTP_OK,
              'message'=>$validator->messages()
          ]);
        }


        $data['created_at']=date('Y-m-d H:i:s');
        $data['updated_at']=date('Y-m-d H:i:s');
        DB::table($table)->insert($data);
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

    public function list(){
      $table = Input::get('table');

      return DB::table($table)->get();
    }
}
