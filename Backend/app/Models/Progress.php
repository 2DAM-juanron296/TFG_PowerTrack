<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use HasFactory;

    protected $fillable = [
        'weight',
        'height',
        'body_fat',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
