<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question4 extends Model
{
    use HasFactory;

    public function question4(): HasMany
    {
        return $this->hasMany(Question4::class);
    }

    protected $table = 'question4';

    protected $fillable = [
        'word',
        'image'
    ];
}
