<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;


    public function lesson(): HasMany
    {
        return $this->hasMany(lesson::class);
    }

    protected $table = 'lesson';

    protected $fillable = [
        'les_name',
        'les_number',
        'thema_id',
        'les_type',
    ];
}
