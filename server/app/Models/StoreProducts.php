<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreProducts extends Model
{
    use HasFactory;

    protected $fillable = ['store_id','product_id','price','stock'];

    public function store()
    {
        return $this->belongsTo(Stores::class);
    }

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
