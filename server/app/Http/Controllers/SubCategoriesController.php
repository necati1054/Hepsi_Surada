<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubCategoriesRequest;
use App\Models\SubCategories;
use Illuminate\Http\Request;

class SubCategoriesController extends Controller
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
        $AllSubCategory = SubCategories::all();

        return $AllSubCategory;
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
    public function store(SubCategoriesRequest $request)
    {
        return SubCategories::create([
            'main_category_id' => $request->input('category_id'),
            'name' => $request->input('name'),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubCategories  $subCategories
     * @return \Illuminate\Http\Response
     */
    public function show(SubCategories $subCategories)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubCategories  $subCategories
     * @return \Illuminate\Http\Response
     */
    public function edit(SubCategories $subCategories)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubCategories  $subCategories
     * @return \Illuminate\Http\Response
     */
    public function update(SubCategoriesRequest $request, SubCategories $subCategories)
    {
        $veri = SubCategories::find($request->sub_category_id);
        $veri ->main_category_id = $request->input('category_id');
        $veri ->name = $request->input('name');
        $veri->update();
        return $veri;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubCategories  $subCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubCategoriesRequest $request,SubCategories $subCategories)
    {
        $veri = SubCategories::find($request->sub_category_id);
        $veri->delete();
        return $veri;
    }
}
