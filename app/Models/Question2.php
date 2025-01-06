<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question2 extends Model
{
    use HasFactory;

    protected $table = 'question2';

    protected $fillable = ['sentence'];
}
