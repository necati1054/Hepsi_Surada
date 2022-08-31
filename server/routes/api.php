<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\MainCategoriesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\StoreProductsController;
use App\Http\Controllers\StoresController;
use App\Http\Controllers\SubCategoriesController;
use App\Http\Controllers\TmpStoreController;
use App\Http\Controllers\WorkerAddController;
use App\Models\StoreProducts;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['api'])->prefix('auth')->group(function(){

    Route::post('register',[AuthController::class,'register']);
    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('me', [AuthController::class,'me']);

});

Route::middleware(['api'])->group(function(){

    Route::get('main_category',[MainCategoriesController::class,'index']);

    Route::get('sub_category',[SubCategoriesController::class,'index']);

    Route::get('product',[ProductsController::class,'index']);

    Route::post('tmp_store',[TmpStoreController::class,'store']);

    Route::get('store',[StoresController::class,'index']);

    Route::get("store_product",[StoreProductsController::class,"index"]);

    Route::get("home",[HomePageController::class,"index"]);
    Route::post("home",[HomePageController::class,"show"]);

});


Route::middleware(['api','IsAdmin'])->group(function(){
    //main
    Route::post('main_category',[MainCategoriesController::class,'store']);
    Route::put('main_category',[MainCategoriesController::class,'update']);
    Route::delete('main_category',[MainCategoriesController::class,'destroy']);
    //sub
    Route::post('sub_category',[SubCategoriesController::class,'store']);
    Route::put('sub_category',[SubCategoriesController::class,'update']);
    Route::delete('sub_category',[SubCategoriesController::class,'destroy']);
    //product
    Route::post('product',[ProductsController::class,'store']);
    Route::put('product',[ProductsController::class,'update']);
    Route::delete('product',[ProductsController::class,'destroy']);
    Route::post("product_image_update",[ProductsController::class,"ImageUpdate"]);
    //tmp
    Route::get('tmp_store',[TmpStoreController::class,'index']);
    Route::put('tmp_store',[TmpStoreController::class,'update']);
});

Route::middleware(['api','IsStoreAdmin'])->group(function(){
    Route::post("logo",[StoresController::class,"logo"]);
    Route::post("cover",[StoresController::class,"cover"]);
    Route::put('store',[StoresController::class,'update']);
    Route::post("worker_add",[WorkerAddController::class,"add"]);
});

Route::middleware(['api','StoreProcess'])->group(function(){
    Route::post("store_info",[StoresController::class,"show"]);

    Route::post("store_product",[StoreProductsController::class,"store"]);
    Route::put("store_product",[StoreProductsController::class,"update"]);
    Route::delete("store_product",[StoreProductsController::class,"destroy"]);
});
