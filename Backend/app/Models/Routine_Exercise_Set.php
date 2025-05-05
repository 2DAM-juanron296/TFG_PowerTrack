<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routine_Exercise_Set extends Model
{
    use HasFactory;

    protected $table = 'routine_exercise_sets';

    protected $fillable = [
        'order',
        'reps',
        'weight',
        'routine_exercise_id'
    ];

    public function routine_exercise() {
        return $this->belongsTo(Routine_Exercise::class, 'routine_exercise_id');
    }
}
