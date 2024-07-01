<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')->constrained();
            $table->unsignedBigInteger('response_no');
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->text('content');
            $table->timestamps();

            $table->unique(['thread_id', 'response_no']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responses');
    }
};
