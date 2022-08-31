<?php

namespace App\Http\Controllers;

use App\Models\MainCategories;
use App\Models\Products;
use App\Models\StoreProducts;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\AssignOp\Concat;

class HomePageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if( $request->s && $request->sc){
            $AllProducts = Products::with(["product_store","Photos"])->whereHas("product_store", function(Builder $query) use ($request){$query->whereIn('store_id', explode(",",$request->s));})->where("name","like","%".$request->key."%")->whereIn("sub_category_id",explode(",",$request->sc))->has("store_product")->get()->paginate(2);
        }else if($request->sc){
            $AllProducts = Products::with("product_store","Photos")->has("store_product")->where("name","like","%".$request->key."%")->whereIn("sub_category_id",explode(",",$request->sc))->get()->paginate(2);
        }else if($request->s)
        {
            $AllProducts = Products::with(["product_store","Photos"])->whereHas("product_store", function(Builder $query) use ($request){$query->whereIn('store_id',explode(",",$request->s));})->where("name","like","%".$request->key."%")->get()->paginate(2);
        }else{
            $AllProducts = Products::has("store_product")->with(["product_store","Photos"])->where("name","like","%".$request->key."%")->get()->paginate(2);
        }

        return $AllProducts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $AllData = Products::where("id",$request->product_id)->get()->load("store_product.store","photos");
        if(count($AllData)){
            return $AllData;
        }else{
            return response()->json([
                "message"=>"product"
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
