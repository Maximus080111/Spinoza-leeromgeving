<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question3 extends Model
{
    use HasFactory;

    public function question3(): HasMany
    {
        return $this->hasMany(Question3::class);
    }

    protected $table = 'question3';

    protected $fillable = [
        'word',
        'image'
    ];
}
