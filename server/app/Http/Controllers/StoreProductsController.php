<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductsRequest;
use App\Models\StoreProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class StoreProductsController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $AllStoreProduct = StoreProducts::all()->load("product","product.photos");

        return $AllStoreProduct;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) //şirket e ürün ekleme
    {
        $success=[];
        $failed=[];
        $failedProductInfo=[];
        $now=Date::now();
        foreach ($request->all() as $i=>$product) {
            if (!empty($product["store_id"]) && !empty($product["product_id"]) && !empty($product["price"]) && !empty($product["stock"])) {
                // if(gettype($product["price"]) == "integer" && gettype($product["stock"]) == "integer" && gettype($product["product_id"]) == "integer"){
                    $success[$i]=[
                        "store_id"=>$product["store_id"],
                        "product_id"=>$product["product_id"],
                        "price"=>$product["price"],
                        "stock"=>$product["stock"],
                        "created_at"=>$now,
                        "updated_at"=>$now,
                    ];
                // }else{
                //     $failed[$i]=[
                //         "store_id"=>$product["store_id"],
                //         "product_id"=>$product["product_id"],
                //         "price"=>$product["price"],
                //         "stock"=>$product["stock"],
                //         "created_at"=>$now,
                //         "updated_at"=>$now,
                //     ];
                // }
            }else{
                $failed[$i]=[
                    "store_id"=>$product["store_id"],
                    "product_id"=>$product["product_id"],
                    "price"=>$product["price"],
                    "stock"=>$product["stock"],
                    "created_at"=>$now,
                    "updated_at"=>$now,
                ];
                $failedProductInfo[$i]=[
                    "store_id"=>$product["product_id"],
                ];
            }

        };
        if(count($success)==0){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        // return response()->json([ //geçiçi olarak devre dışı
        //     'data' => $success,
        //     'hatalı' => $failed,
        // ],422);

        StoreProducts::insert($success);
            $AllStoreProduct = StoreProducts::where("store_id",$request[0]["store_id"])->get()->load("product","product.photos");
            return response()->json([
                'data' => $AllStoreProduct,
                'hatalı' => $failed,
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function show(StoreProducts $storeProducts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function edit(StoreProducts $storeProducts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function update(StoreProductsRequest $request, StoreProducts $storeProducts) //şirket e ürün güncelleme
    {
        $data = StoreProducts::find($request->store_product_id);
        $data->price = $request->input("price");
        $data->stock = $request->input("stock");
        $data->update();
        $data2 = $data->load("product","product.photos");
        return $data2;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StoreProducts  $storeProducts
     * @return \Illuminate\Http\Response
     */
    public function destroy(StoreProductsRequest $request, StoreProducts $storeProducts)
    {
        $data = StoreProducts::find($request->store_product_id);
        $data->delete();
        return $data;
    }
}
