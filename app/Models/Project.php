<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'bookmark',
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
        'streak_duration' => 'integer',
        'streaks_per_session' => 'integer',
        'session_duration' => 'integer',
        'last_modified' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::random(20);
            }
        });
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id', 'firebase_uid');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members', 'project_id', 'user_id', 'id', 'firebase_uid');
    }
}
