<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuscleGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function exercises() {
        return $this->hasMany(Exercise::class, 'muscle_group_id');
    }
}
