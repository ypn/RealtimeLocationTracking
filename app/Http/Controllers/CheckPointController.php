<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Input;
use App\Entities\CheckPoint;
use App\Entities\ModeCheckPoints;
use Illuminate\Http\Response as Res;

use Validator;

class CheckPointController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function create(){

      $data = Input::all();
      $rules  = [
        'checkpoint_name'=>'required',
        'checkpoint_time'=>'required',
        'polygon'=>'required'
      ];

      $validator = Validator::make($data,$rules);

      if($validator->fails()){
        return response()->json([
            'status' => 'validator_error',
            'status_code' => Res::HTTP_OK,
            'message'=>$validator->messages()
        ]);
      }

      return CheckPoint::create($data);
    }

    public function list(){
      return CheckPoint::list();
    }

    public function addRemoveFromMode(){
      $input = Input::all();

      $rules  = [
        'state'=>'required',
        'checkpoint_id'=>'required',
        'mode_id'=>'required'
      ];

      $validator = Validator::make($input,$rules);

      if($validator->fails()){
        return response()->json([
            'status' => 'validator_error',
            'status_code' => Res::HTTP_OK,
            'message'=>$validator->messages()
        ]);
      }

      return ModeCheckPoints::addRemoveFromMode($input);
    }

    public function onChangeStateModeCheckPoint(){
      $input = Input::all();
      $rules  = [
        'checkpoint_id'=>'required',
        'mode_id'=>'required'
      ];

      $validator = Validator::make($input,$rules);

      if($validator->fails()){
        return response()->json([
            'status' => 'validator_error',
            'status_code' => Res::HTTP_OK,
            'message'=>$validator->messages()
        ]);
      }

      return ModeCheckPoints::onChangeStateModeCheckPoint($input);
    }

    public function listEnabled(){
      $mode_id=Input::get('mode_id');
      return ModeCheckPoints::listEnabled((int)$mode_id);
    }


    //For android
    public function listCheckPointsOfMode(){
      $mode_id=Input::get('mode_id');
      return ModeCheckPoints::listCheckPointsOfMode((int)$mode_id);
    }

    public function isCheckPointAvaiabled(){
      $input = Input::all();
      $rules  = [
        'checkpoint_id'=>'required',
        'mode_id'=>'required'
      ];

      $validator = Validator::make($input,$rules);

      if($validator->fails()){
        return response()->json([
            'status' => 'validator_error',
            'status_code' => Res::HTTP_OK,
            'message'=>$validator->messages()
        ]);
      }

      return ModeCheckPoints::isCheckPointAvaiabled($input);
    }
}
