<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Input;
use App\Entities\CheckPoint;

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
}
