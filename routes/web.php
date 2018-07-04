<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'ModeTrackingController@loadMap');
Route::get('/login', 'Controller@login');
Route::get('/s5s','Controller@s5s');
Route::get('/report-detail/{sessionId}','Controller@reportDetail');
Route::get('test-send-email','MailController@testSend');

Route::get('/register','Controller@register');

Route::group(['middleware' => 'guest', 'prefix' => 'app'], function () {
    Route::get('/', 'ModeTrackingController@entry');
    Route::get('/{any}', 'ModeTrackingController@entry')->where('any', '.*');
});

Route::group(['middleware' => 'web', 'prefix' => 'api/v1'], function () {
    Route::group(['middleware' => 'web', 'prefix' => 'mode-tracking'], function () {
        Route::post('add', 'ModeTrackingController@add');
        Route::post('list','ModeTrackingController@list');
        Route::post('list-enabled','ModeTrackingController@listEnabled');
        Route::post('minimal-list','ModeTrackingController@minList');
        Route::post('get','ModeTrackingController@getMode');
        Route::post('get-object-tracked-with-mode','ModeTrackingController@getObjectTrackedWithMode');
        Route::post('del','ModeTrackingController@del');
        Route::post('update-state','ModeTrackingController@updateState');
        Route::post('list-checkpoints','ModeTrackingController@listCheckpoints');
        Route::post('update-mode','ModeTrackingController@updateMode');
    });

    Route::group(['middleware'=>'web','prefix'=>'object-tracking'],function(){
        Route::post('create','ObjectTrackingController@create');
        Route::post('list','ObjectTrackingController@list');
        Route::post('list-pagination','ObjectTrackingController@listWithPagination');
        Route::post('list-objects-on-tracking','ObjectTrackingController@listObjectsOnTracking');
        Route::post('remove','ObjectTrackingController@remove');
        Route::post('list-all-objects-on-tracking','ObjectTrackingController@listAllObjectOnTracking');
    });

    Route::group(['middleware'=>'web','prefix'=>'checkpoint'],function(){
        Route::post('create','CheckPointController@create');
        Route::post('list','CheckPointController@list');
        Route::post('add-remove-from-mode','CheckPointController@addRemoveFromMode');
        Route::post('on-changestate-mode-checkpoint','CheckPointController@onChangeStateModeCheckPoint');
        Route::post('is-checkpoint-available','CheckPointController@isCheckPointAvaiabled');
        Route::post('list-enabled','CheckPointController@listEnabled');
        Route::post('get','CheckPointController@get');
        Route::post('edit','CheckPointController@edit');
    });

    Route::group(['middleware'=>'web','prefix'=>'report'],function(){
        Route::post('list-object-tracked','ReportController@listObjectTracked');
        Route::post('get-detail','ReportController@getDetail');
        Route::post('export-excel','ReportController@exportExcel');
        Route::get('get-tracking-detail/{id}','ReportController@getTrackingDetail');
        Route::get('exportExcel/{mode_id}','ReportController@exportExcel');
        Route::post('get-violate-subject','ReportController@getViolateSubject');
    });

    Route::group(['middleware'=>'web','prefix'=>'mobile'],function(){
      Route::group(['middleware' => 'web', 'prefix' => 'mode-tracking'], function() {
          Route::get('list-enabled','ModeTrackingController@listEnabled');
      });

      Route::group(['middleware' => 'web', 'prefix' =>'object-tracking'], function() {
          Route::post('list','ObjectTrackingController@list');
      });

      Route::group(['middleware' => 'web', 'prefix' => 'checkpoints'], function() {
          Route::post('list-checkpoint-of-mode','CheckPointController@listCheckPointsOfMode');
      });

      Route::post('reporttimeout','MailController@sendWarning');
    });

    Route::post('login','Auth\LoginController@login');
    Route::post('logout','Auth\LoginController@logoutUser');
    Route::get('email/{id}','MailController@apiSendEmail');

});
