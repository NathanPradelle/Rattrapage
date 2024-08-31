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
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_first')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('user_second')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->text('message');
            $table->timestamps();
            $table->index(['user_first', 'user_second']);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
