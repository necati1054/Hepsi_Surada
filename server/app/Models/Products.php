<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = ['name','description','sub_category_id'];

    public function sub_category()
    {
        return $this->belongsTo(sub_category::class);
    }

    public function photos()
    {
        return $this->morphMany(photos::class,'imageable')->orderBy('type','asc');
    }

    public function store_product()
    {
        return $this->hasMany(StoreProducts::class,"product_id","id")->orderBy("price","asc");
    }

    public function product_store()
    {
        return $this->belongsToMany(Stores::class,'store_products', 'product_id', 'store_id')->as("info")->withPivot('price', 'stock')->orderBy("price");
    }
}
