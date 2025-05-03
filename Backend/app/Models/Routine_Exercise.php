<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routine_Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'routine_id',
        'exercise_id',
    ];

    public function routine() {
        return $this->belongsTo(Routine::class, 'routine_id');
    }

    public function exercise() {
        return $this->belongsTo(Exercise::class, 'exercise_id');
    }
}
