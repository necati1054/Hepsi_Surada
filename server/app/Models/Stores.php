<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stores extends Model
{
    use HasFactory;

    protected $fillable = ['name','email','adres','tel'];

    public function photos()
    {
        return $this->morphMany(photos::class,'imageable')->orderBy('type','asc');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function store_product()
    {
        return $this->hasMany(StoreProducts::class);
    }
}
