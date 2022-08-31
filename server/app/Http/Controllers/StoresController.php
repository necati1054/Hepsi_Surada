<?php

namespace App\Http\Controllers;

use App\Models\Photos;
use App\Models\StoreProducts;
use App\Models\Stores;
use App\Models\User;
use Illuminate\Http\Request;
use Nette\Utils\Json;

class StoresController extends Controller
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
        $AllStore = Stores::all();

        return $AllStore;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Stores $stores)
    {
        $validator = validator()->make($request->all(),[
            'store_id'=>'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $store = Stores::find($request->store_id)->load("photos");
        $storeUrun = StoreProducts::where("store_id",$request->store_id)->get()->load("product","product.photos");
        $kisi = User::where("store_id",$request->store_id)->get();

        return response()->json([
            "store_info"=>$store,
            "store_product"=>$storeUrun,
            "person"=>$kisi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function edit(Stores $stores)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'store_id'=>'required',
            'name' => 'string|required',
            'email' => 'email|required',
            'adres' => 'string|required',
            'tel' => 'string|required',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $mağaza = Stores::find($request->store_id);
        $mağaza->name = $request->name;
        $mağaza->email = $request->email;
        $mağaza->adres = $request->adres;
        $mağaza->tel = $request->tel;
        $mağaza->update();
        $data = $mağaza->load("photos");
        return $data;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Stores  $stores
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stores $stores)
    {
        //
    }

    public function logo(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'store_id'=>'required',
            'logo' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $StorePhoto = Photos::where('imageable_id','=',$request->store_id)->where('type','=',"0")->first();

        if(!$StorePhoto->path == "Default_Logo.png")
        {
            unlink("Image/".$StorePhoto->path);
        }
            $file = $request->file("logo");
            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);

            $StorePhoto->delete();

            Photos::create([
                'path' => $imageName,
                'imageable_type'=> Stores::class,
                'imageable_id' =>  $request->store_id,
                'type' => 0
            ]);

            $data = Stores::find($request->store_id)->load("photos");
            return $data;
    }

    public function cover(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'store_id'=>'required',
            'cover' => 'required|image|mimes:jpeg,png,jpg',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $StorePhoto = Photos::where('imageable_id','=',$request->store_id)->where('type','=',"1")->first();

        if(!$StorePhoto->path == "Default_Cover.png")
        {
            unlink("Image/".$StorePhoto->path);
        }
            $file = $request->file("cover");

            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);

            $StorePhoto->delete();

            Photos::create([
                'path' => $imageName,
                'imageable_type'=> Stores::class,
                'imageable_id' =>  $request->store_id,
                'type' => 1
            ]);

            $data = Stores::find($request->store_id)->load("photos");
            return $data;
    }
}
