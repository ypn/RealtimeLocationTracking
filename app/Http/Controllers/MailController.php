<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Entities\TrackingLogger;
use App\Entities\CheckPoint;
use App\Entities\ModesTracking;
use Mail;
use Carbon\Carbon;

class MailController extends Controller
{

    public function apiSendEmail($id){
      return $this->sendEmail($id);
    }

    protected function sendEmail($sessionId){
      $data = TrackingLogger::getMinimum($sessionId)['data'];

      $listemail = ModesTracking::getModeEmail($data->mode_id);

      $list_email_to_send = $listemail->list_email_send!=null ? explode(",",$listemail->list_email_send) : null;

      if($list_email_to_send==null){
        return 'email list null';
      }

      $list_email_cc = $listemail->list_email_cc!=null ? explode(",",$listemail->list_email_cc) : null;
      $mode_name = $listemail->name;

      $time_diff = $this->getTimeDiff(new Carbon($data->created_at),new Carbon($data->ended_at));

      $timeline = json_decode($data->timeline);

      $timelineformatted = array();

      foreach($timeline as $k=>$time){
        $time = json_decode($time);

        $dt = new \DateTime($time->time_at);

        $time->checkpoint_name = CheckPoint::getName($time->checkpointID);
        $time->date =  $dt->format('m/d/Y');
        $time->time = $dt->format('H:i:s');


        if($time->type==1){
          $time_end = new Carbon((json_decode($timeline[$k+1]))->time_at);
          $time_start = new Carbon($time->time_at);
          $time->time_diff_in_second = $time_end->diffInSeconds($time_start);
          $time->time_diff_formatted = $this->getTimeDiff($time_start,$time_end);
        }

        array_push($timelineformatted,$time);
      }

      try{
        Mail::send('mailfb',array(
          'object_tracking'=>$data->object_tracking,
          'created_at'=>$data->created_at,
          'ended_at'=>$data->ended_at,
          'time_diff'=>$time_diff,
          'mode_name'=>$mode_name,
          'timeline'=>$timelineformatted
        ), function($message) use ($list_email_to_send,$list_email_cc) {
             $message->to($list_email_to_send)->subject('Hệ thống tự động thông kết quả giám sát!');
             if($list_email_cc !=null){
               $message->cc($list_email_cc);
             }
         });
      }catch(\Exception $ex){
        return $ex->getMessage();
      }

       return ('send successfully');
    }

    protected function getTimeDiff($time1,$time2){
      $second_diff = $time2->diffInSeconds($time1);
      $min_diff = floor($second_diff/60);

      $sec = $second_diff - $min_diff*60;
      $hour = floor($min_diff/60);
      $m = $min_diff - $hour*60;
      return($hour . 'h' . ':' . $m . 'm' .':' .$sec .'s');
    }
}
