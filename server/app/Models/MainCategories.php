<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainCategories extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function sub_category()
    {
        return $this->hasMany(SubCategories::class,"main_category_id","id");
    }

}
