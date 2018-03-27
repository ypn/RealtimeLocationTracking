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


Route::get('/', 'ModeTrackingController@entry');

Route::group(['middleware' => 'web', 'prefix' => 'app'], function () {
    Route::get('/', 'ModeTrackingController@entry');
    Route::get('/{any}', 'ModeTrackingController@entry')->where('any', '.*');
});


Route::group(['middleware' => 'web', 'prefix' => 'api/v1'], function () {
    Route::group(['middleware' => 'web', 'prefix' => 'mode-tracking'], function () {
        Route::post('add', 'ModeTrackingController@add');
        Route::post('list','ModeTrackingController@list');
        Route::post('minimal-list','ModeTrackingController@minList');
        Route::post('get','ModeTrackingController@getMode');
        Route::post('del','ModeTrackingController@del');
        Route::post('update-state','ModeTrackingController@updateState');
    });

    Route::group(['middleware'=>'web','prefix'=>'object-tracking'],function(){
        Route::post('create','ObjectTrackingController@create');
    });
});
