<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadWithResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'name' => $this->name ?? 'カワイイ名無しさん',
            'content' => $this->content,
            'created_at' => $this->created_at->isoFormat('YYYY/M/D/(ddd) HH:mm:ss'),
            'updated_at' => $this->updated_at->isoFormat('YYYY/M/D/(ddd) HH:mm:ss'),
        ];
    }
}
