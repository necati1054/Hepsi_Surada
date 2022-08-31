<?php

namespace App\Http\Controllers;

use App\Http\Requests\MainCategoriesRequest;
use App\Models\MainCategories;
use Illuminate\Http\Request;

class MainCategoriesController extends Controller
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
    public function index(Request $request)
    {
        if($request->category_id){
            return $AllCategory = MainCategories::where('id',$request->category_id)->get();
        }else{
            $AllCategory = MainCategories::all();

            return $AllCategory;
        }
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
    public function store(MainCategoriesRequest $request)
    {
        return MainCategories::create([
            'name' => $request->input('name'),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function show(MainCategories $mainCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function edit(MainCategories $mainCategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function update(MainCategoriesRequest $request, MainCategories $mainCategories)
    {
        $veri = MainCategories::find($request->category_id);
        $veri->name = $request->get('name');
        $veri->update();
        return $veri;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MainCategories  $mainCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(MainCategoriesRequest $request,MainCategories $mainCategories)
    {
        $veri = MainCategories::find($request->category_id);
        $veri->delete();
        return $veri;
    }
}
