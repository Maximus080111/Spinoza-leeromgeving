<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question2 extends Model
{
    use HasFactory;

    public function question2(): HasMany
    {
        return $this->hasMany(Question2::class);
    }

    protected $table = 'question2';

    protected $fillable = ['sentence', 'lesson_id'];
}
