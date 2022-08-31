<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tmp_workers', function (Blueprint $table) {
            $table->id();
            $table->string('url'); // şirket sahibi girdiği mail adresine göre oluşacak
            $table->unsignedInteger('admin_id'); //ekleyen kişinin id si
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tmp_workers');
    }
};
