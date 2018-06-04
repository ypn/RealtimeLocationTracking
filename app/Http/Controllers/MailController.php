<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class MailController extends Controller
{
    public function sendEmail(){
      Mail::send('mailfb', array('name'=>'name','email'=>'email', 'content'=>'content'), function($message){
           $message->to('ypn@vijagroup.com.vn', 'Visitor')->subject('Thông kết quả giám sát!');
       });
       //Session::flash('flash_message', 'Send message successfully!');

       return ('send successfully');
    }
}
