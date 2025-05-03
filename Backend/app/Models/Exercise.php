<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable =[
        'name',
        'description',
        'muscle_group_id'
    ];

    public function muscle_group() {
        return $this->belongsTo(MuscleGroup::class, 'muscle_group_id');
    }

    public function routines_exercise() {
        return $this->hasMany(Routine_Exercise::class, 'exercise_id');
    }
}
