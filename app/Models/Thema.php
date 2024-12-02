<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Thema extends Model
{
    use HasFactory;

    public function themas(): HasMany
    {
        return $this->hasMany(Thema::class);
    }

    protected $fillable = [
        'name',
        'image'
    ];
}
