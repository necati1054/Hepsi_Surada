<?php

namespace App\Http\Controllers;

use App\Http\Requests\TmpStoreRequest;
use App\Models\Photos;
use App\Models\Stores;
use App\Models\tmp_store;
use App\Models\User;
use Illuminate\Http\Request;

class TmpStoreController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tmp = tmp_store::all();

        return $tmp;
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
    public function store(TmpStoreRequest $request)
    {
        $data = tmp_store::where("user_id",$request->input('user_id'))->get();
        if(count($data)== 0){
            return tmp_store::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'adres' => $request->input('adres'),
                'tel' => $request->input('tel'),
                'user_id' => $request->input('user_id'),
            ]);
        }else{
            return response()->json([
                'message' => 'Failed'
            ],422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function show(tmp_store $tmp_store)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function edit(tmp_store $tmp_store)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function update(TmpStoreRequest $request, tmp_store $tmp_store)
    {
            $tmp = tmp_store::find($request->tmp_store_id);
            $mağaza = new Stores([
                'name' => $tmp->name,
                'email' => $tmp->email,
                'adres' => $tmp->adres,
                'tel' => $tmp->tel,
            ]);
            $mağaza->save();

            Photos::create([
                'path' => 'Default_Logo.png',
                'imageable_type'=> Stores::class,
                'imageable_id' =>  $mağaza->id,
                'type' => 0
            ]);

            Photos::create([
                'path' => 'Default_Cover.png',
                'imageable_type'=> Stores::class,
                'imageable_id' =>  $mağaza->id,
                'type' => 1
            ]);

            $sahip = User::find($tmp->user_id);
            $sahip->store_id=$mağaza->id;
            $sahip->user_level="1";
            $sahip->update();

            $tmp->delete();

            return $tmp;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tmp_store  $tmp_store
     * @return \Illuminate\Http\Response
     */
    public function destroy(tmp_store $tmp_store)
    {
        //
    }
}
