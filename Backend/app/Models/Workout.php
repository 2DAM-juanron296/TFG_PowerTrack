<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'duration',
        'volume_training',
        'routine_id',
        'user_id',
    ];

    public function routine()
    {
        return $this->belongsTo(Routine::class, 'routine_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
