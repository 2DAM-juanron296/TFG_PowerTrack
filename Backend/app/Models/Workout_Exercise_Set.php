<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout_Exercise_Set extends Model
{
    use HasFactory;

    protected $table = 'workout_exercise_sets';

    protected $fillable = [
        'order',
        'reps',
        'weight',
        'workout_exercise_id'
    ];

    public function workout_exercise()
    {
        return $this->belongsTo(Workout_Exercise::class, 'workout_exercise_id');
    }
}
