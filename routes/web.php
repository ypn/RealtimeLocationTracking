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

<<<<<<< HEAD

Route::get('/', 'Controller@loadMap');
=======
Route::get('/', 'ModeTrackingController@entry');
Route::get('/login', 'Controller@login')->name('login');
>>>>>>> a5bd32983688256856811969ffe5ba45ecd4ccea

Route::group(['middleware' => 'auth', 'prefix' => 'app'], function () {
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
        Route::post('list','ObjectTrackingController@list');
        Route::post('remove','ObjectTrackingController@remove');
    });
});
