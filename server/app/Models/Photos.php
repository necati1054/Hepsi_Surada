<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    use HasFactory;

    protected $fillable = ['path','imageable_type','imageable_id','type'];

    public function imageable()
    {
        return $this->morphTo();
    }
}
