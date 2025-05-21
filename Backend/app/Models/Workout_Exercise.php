<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout_Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'workout_id',
        'exercise_id'
    ];

    public function workout()
    {
        return $this->belongsTo(Workout::class, 'workout_id');
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'exercise_id');
    }

    public function sets()
    {
        return $this->hasMany(Workout_Exercise_Set::class, 'workout_exercise_id');
    }
}
