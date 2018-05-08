<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Entities\ModesTracking;
use App\Entities\TrackingLogger;
use App\Entities\CheckPoint;
use Illuminate\Support\Collection;
use DB,Sentinel;


use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function loadMap(){
      return view('frontend.map');
      //
      // $spreadsheet = new Spreadsheet();
      // $sheet = $spreadsheet->getActiveSheet();
      // $sheet->setCellValue('A1', 'Hello World !');
      //
      // $writer = new Xlsx($spreadsheet);
      // $a = $writer->save('hello world.xlsx');
      //
      // return 'tttt';


    }

    public function login(){
      return view('login');
    }    


    public function register(){
      $credentials = [
          'email'    => 'admin',
          'password' => 'fafgajfg',
      ];
      return(Sentinel::registerAndActivate($credentials));
    }
}
