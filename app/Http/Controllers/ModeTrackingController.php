<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entities\ModesTracking;
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
}
