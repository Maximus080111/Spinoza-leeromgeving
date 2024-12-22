<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question1 extends Model
{
    use HasFactory;

    public function question1(): HasMany
    {
        return $this->hasMany(Question1::class);
    }

    protected $table = 'question1';

    protected $fillable = [
        'question',
        'answers',
        'correct'
    ];
}
