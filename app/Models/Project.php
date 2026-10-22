<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'description',
        'layers',
        'data',
        'space_multi_parters',
        'streak_duration',
        'streaks_per_session',
        'session_duration',
        'show_streaks',
        'group_streaks',
        'last_modified',
    ];

    protected $casts = [
        'layers' => 'array',
        'data' => 'array',
        'show_streaks' => 'boolean',
        'group_streaks' => 'boolean',
        'last_modified' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'firebase_uid');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members', 'project_id', 'user_id');
    }
}
