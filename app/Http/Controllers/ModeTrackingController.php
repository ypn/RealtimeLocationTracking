<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entities\ModesTracking;
use App\Entities\TrackingLogger;
use Response;
use Illuminate\Support\Facades\Input;


class ModeTrackingController extends Controller
{
    public function entry(){
      return view('admin.mode_tracking.list');
    }

    public function add(){
      $input = Input::all();
      return ModesTracking::add($input);
    }

    public function list(){
      return ModesTracking::list();
    }

    public function listEnabled(){
      return ModesTracking::listEnabled();
    }

    public function minList(){
      return ModesTracking::minList( Input::get('required'));
    }

    public function del(){
      return ModesTracking::del(Input::get('id'),Input::get('table_reference'));
    }

    public function updateState(){
      return ModesTracking::updateState(Input::get('id'));
    }

    public function getMode(){
      return ModesTracking::getMode(Input::get('id'));
    }

    public function listCheckpoints(){
      return ModesTracking::listCheckpoints(Input::get('mode_id'));
    }

    public function updateMode(){
      $list_send = array();
      $list_cc = array();
      $time_frequence = Input::get('time_frequence');
      $list_email_to_send_report = Input::get('list_email_to_send_report');
      $list_email_to_cc_report = Input::get('list_email_to_cc_report');
      $mode_id = Input::get('mode_id');

      if($list_email_to_send_report!=null){
         $list_send = explode(",",$list_email_to_send_report);

         foreach($list_send as $email){
           if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
             return response()->json([
                 'status' => '0',
                 'status_code' => 'EMAIL_SEND_INVALID',
                 'message'=>'Định dạng danh sách email gửi không đúng!'
             ]);
           }
         }
      }

      if($list_email_to_cc_report!=null){
        $list_cc = explode(",",$list_email_to_cc_report);
        foreach($list_cc as $email){
          if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json([
                'status' => '0',
                'status_code' => 'EMAIL_CC_INVALID',
                'message'=>'Định dạng danh sách email đính kèm không đúng!'
            ]);
          }
        }
      }

      return ModesTracking::updateMode($mode_id,$time_frequence,$list_email_to_send_report,$list_email_to_cc_report);
    }

}
