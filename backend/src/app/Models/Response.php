<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory, \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

   protected $fillable = [
       'response_no',
       'name',
       'email',
       'content',
   ];

   public function responses()
   {
    return $this->hasMany(Response::class);
   }
}
