<?php

namespace App\Http\Controllers;

use App\Models\Photos;
use App\Models\Products;
use Illuminate\Http\Request;
use Nette\Utils\Json;

class ProductsController extends Controller
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
        $AllProducts = Products::all()->load("photos");

        return $AllProducts;
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
        $validator = validator()->make($request->all(),[
            'name' => 'string|required',
            'description' => 'string|required',
            'sub_category_id' => 'string|required',
            'images' => 'required|image|mimes:jpeg,png,jpg'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $poruct = new Products([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'sub_category_id' => $request->input('sub_category_id'),
        ]);

        $poruct->save();

        $files = $request->file("images");


        $i = 0 ;
        foreach ($files as $file) {
            $data = new Photos();

            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);

            $data->imageable_type = Products::class;
            $data->imageable_id = $poruct->id;
            $data->type = $i;
            $data->path = $imageName;
            $data->save();
            $i +=1;
        }

        $newData = $poruct->load("photos");

        return $newData;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        $validator = validator()->make($request->all(),[
            'product_id' => 'string|required',
            'name' => 'string|required',
            'description' => 'string|required',
            'sub_category_id' => 'string|required',
            'images_id' => 'string|required'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $veri = Products::find($request->product_id);

        $veri->name = $request->input('name');
        $veri->description = $request->input('description');
        $veri->sub_category_id = $request->input('sub_category_id');
        $veri->update();

        if($request->images_id != 0){
            $data = $veri->photos; //hangi veri ise onun photolarını getiriyor

            $data2 = "";
            $data3 = "";

            foreach ($data as $key) {
                if($key->id == $request->images_id){
                    $data2 = $key;
                }
            }

            foreach ($data as $key) {
                if($key->type == "0"){
                    $data3 = $key;
                }
            }

            $data3["type"] = $data2->type;
            $data2["type"] = "0";

            $data2->update();
            $data3->update();
        }

        $newData =$veri->load("photos");

        return $newData;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,Products $products)
    {
        $validator = validator()->make($request->all(),[
            'product_id' => 'string|required',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        $veri = Products::find($request->product_id);

        $data = $veri->photos;

        foreach ($data as $key) {
            $key->delete();
            unlink("Image/".$key->path);
        }

        $veri->delete();
        return $veri;

    }

    public function ImageUpdate(Request $request)
    {
        $validator = validator()->make($request->all(),[
            'UpdateImageProductId' => "required",
            'product_image_id_1' => 'string|required',
            'product_image_id_2' => 'string|required',
            'product_image_id_3' => 'string|required',
            'product_image_file_1' => 'image',
            'product_image_file_2' => 'image',
            'product_image_file_3' => 'image',
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Failed'
            ],422);
        }

        if($request->product_image_file_1){
            $Image = Photos::find($request->product_image_id_1); //photoyu al
            $file = $request->file("product_image_file_1"); //gelen veriyi al
            unlink("Image/".$Image->path);//eski photoyu dosyadan sil
            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);
            $Image->path = $imageName; //path ini değiştir
            $Image->update(); //save
        }
        if($request->product_image_file_2){
            $Image = Photos::find($request->product_image_id_2); //photoyu al
            $file = $request->file("product_image_file_2"); //gelen veriyi al
            unlink("Image/".$Image->path);//eski photoyu dosyadan sil
            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);
            $Image->path = $imageName; //path ini değiştir
            $Image->update(); //save
        }
        if($request->product_image_file_3){
            $Image = Photos::find($request->product_image_id_3); //photoyu al
            $file = $request->file("product_image_file_3"); //gelen veriyi al
            unlink("Image/".$Image->path);//eski photoyu dosyadan sil
            $imageName = time().'_'. $file->getClientOriginalName();
            $file->move(\public_path('Image'),$imageName);
            $Image->path = $imageName; //path ini değiştir
            $Image->update(); //save

        }
        $data = Products::find($request->UpdateImageProductId)->load("photos");
        return $data;
    }
}
