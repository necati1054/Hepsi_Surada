<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategories extends Model
{
    use HasFactory;

    protected $fillable = ['name','main_category_id'];

    public function main_category()
    {
        return $this->belongsTo(MainCategories::class,"main_category_id","id");
    }

    public function product()
    {
        return $this->hasMany(Products::class,"sub_category_id","id");
    }
}
